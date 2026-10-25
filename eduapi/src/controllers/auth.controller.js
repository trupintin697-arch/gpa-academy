import { db } from '../data/dbStore.js';

// In-memory OTP store: { [contact]: { code, expiresAt } }
const otpStore = new Map();

export const login = (req, res) => {
  try {
    const { email, role = "student", password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    let user = db.getUserByEmail(email);
    if (!user) {
      // Auto-register or create demo profile
      user = db.addUser({
        id: `usr_${Date.now()}`,
        name: email.split('@')[0],
        email: email.toLowerCase(),
        role: role || "student",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        joinedAt: new Date().toISOString(),
        banned: false
      });
    }

    if (user.banned) {
      return res.status(403).json({
        success: false,
        message: `Account suspended. Reason: ${user.banReason || 'Administrative decision'}`,
        banned: true
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      data: user,
      token: `gpa_token_${Buffer.from(user.id).toString('base64')}`
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const register = (req, res) => {
  try {
    const { name, email, role = "student", phone } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return res.json({
        success: true,
        message: "User already registered, logged in",
        data: existing,
        token: `gpa_token_${Buffer.from(existing.id).toString('base64')}`
      });
    }

    const newUser = db.addUser({
      id: `usr_${Date.now()}`,
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      role: role || "student",
      phone: phone || "",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || email)}`,
      joinedAt: new Date().toISOString(),
      banned: false
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: newUser,
      token: `gpa_token_${Buffer.from(newUser.id).toString('base64')}`
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const sendOtp = (req, res) => {
  try {
    const { contact } = req.body;
    if (!contact) {
      return res.status(400).json({ success: false, message: "Email or phone number is required" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(contact.toLowerCase(), {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    return res.json({
      success: true,
      message: "OTP sent successfully to " + contact,
      otp: code // Returned for testing & client display
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyOtp = (req, res) => {
  try {
    const { contact, otp, name, role = "student" } = req.body;
    if (!contact || !otp) {
      return res.status(400).json({ success: false, message: "Contact and OTP are required" });
    }

    const stored = otpStore.get(contact.toLowerCase());
    // Also allow master OTP '918234' for quick development/testing
    const isValid = (stored && stored.code === otp && stored.expiresAt > Date.now()) || otp === "918234";

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    otpStore.delete(contact.toLowerCase());

    let user = db.getUserByEmail(contact);
    if (!user) {
      user = db.addUser({
        id: `usr_${Date.now()}`,
        name: name || contact.split('@')[0],
        email: contact.toLowerCase(),
        role: role || "student",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || contact)}`,
        joinedAt: new Date().toISOString(),
        banned: false
      });
    }

    return res.json({
      success: true,
      message: "OTP verified successfully",
      data: user,
      token: `gpa_token_${Buffer.from(user.id).toString('base64')}`
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getMe = (req, res) => {
  const userId = req.headers['x-user-id'] || req.query.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized: Missing user header" });
  }
  const user = db.getUserById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  return res.json({ success: true, data: user });
};

export const getAllUsers = (req, res) => {
  return res.json({ success: true, data: db.getUsers() });
};

export const banUser = (req, res) => {
  try {
    const { id } = req.params;
    const { banned = true, reason = "Violation of terms" } = req.body;
    const updated = db.updateUser(id, { banned, banReason: banned ? reason : undefined });
    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, message: banned ? "User banned" : "User unbanned", data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProfile = (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateUser(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, message: "Profile updated", data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
