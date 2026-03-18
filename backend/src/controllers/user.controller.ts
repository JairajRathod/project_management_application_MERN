import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation (prefer Zod in real apps)
    if (!name || !email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ApiError(409, "User already exists with this email"));
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Verify creation
    if (!user) {
      return next(new ApiError(500, "User registration failed"));
    }

    // 6. Remove sensitive data
    const createdUser = await User.findById(user._id).select("-password");

    // 7. Send response
    return res
      .status(201)
      .json(ApiResponse(201, "User registered successfully", createdUser));
  } catch (error) {
    next(error);
  }
};

// login logic
export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return next(new ApiError(400, "Email and password are required"));
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Check if user exists
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return next(new ApiError(404, "User does not exist"));
    }

    // 3. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // 4. Generate tokens (Access + Refresh)
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" },
    );

    // 5. (Optional) Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // 6. Remove sensitive fields
    const safeUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    // 7. Set cookies (secure)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, // 1 days
    });

    // 8. Send response
    return res.status(200).json(
      ApiResponse(200, "User logged in successfully", {
        user: safeUser,
        accessToken, // optional (if using cookies, can omit)
      }),
    );
  } catch (error: any) {
    next(error);
  }
};

// password reset otp verification
export const resetPasswordVerificationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    // 1. Validate input
    if (!email) {
      return next(new ApiError(400, "Email is required"));
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Check user existence
    const user = await User.findOne({ email: normalizedEmail });

    // Prevent user enumeration (important)
    if (!user) {
      return res
        .status(200)
        .json(
          ApiResponse(
            200,
            "If an account with this email exists, a reset OTP has been sent",
            null,
          ),
        );
    }

    // 3. Generate OTP (6 digit)
    const otp = crypto.randomInt(100000, 999999).toString();

    // 4. Hash OTP before saving (never store raw OTP)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // 5. Set expiry (5 minutes)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // 6. Save to DB
    user.verificationOtp = hashedOtp;
    user.verificationOtpExpiry = otpExpiry;
    await user.save({ validateBeforeSave: false });

    // // 7. Send email
    // const emailSent = await sendEmail({
    //   to: user.email,
    //   subject: "Password Reset OTP",
    //   html: `
    //     <h2>Password Reset Request</h2>
    //     <p>Your OTP is:</p>
    //     <h1>${otp}</h1>
    //     <p>This OTP will expire in 5 minutes.</p>
    //   `,
    // });

    // if (!emailSent) {
    //   return next(new ApiError(500, "Failed to send verification email"));
    // }

    // 8. Success response
    return res
      .status(200)
      .json(
        ApiResponse(
          200,
          "If an account with this email exists, a reset OTP has been sent",
          null,
        ),
      );
  } catch (error) {
    next(error);
  }
};

// reset password
export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1. Validate input
    if (!email || !otp || !newPassword) {
      return next(
        new ApiError(400, "Email, OTP and new password are required"),
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Find user
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !user.verificationOtp || !user.verificationOtpExpiry) {
      return next(new ApiError(400, "Invalid or expired OTP"));
    }

    // 3. Check OTP expiry
    if (user.verificationOtpExpiry < new Date()) {
      return next(new ApiError(400, "OTP has expired"));
    }

    // 4. Hash incoming OTP and compare
    const hashedIncomingOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (hashedIncomingOtp !== user.verificationOtp) {
      return next(new ApiError(400, "Invalid OTP"));
    }

    // 5. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // 6. Update password + clear OTP fields
    user.password = hashedPassword;
    user.verificationOtp = undefined;
    user.verificationOtpExpiry = undefined;

    // (optional) invalidate sessions
    user.refreshToken = undefined;

    const updatedUser = await user.save();

    // 7. Verify update
    if (!updatedUser) {
      return next(new ApiError(500, "Password reset failed"));
    }

    // 8. Success response
    return res
      .status(200)
      .json(ApiResponse(200, "Password reset successfully", null));
  } catch (error) {
    next(error);
  }
};
