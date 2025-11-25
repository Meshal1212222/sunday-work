import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Organization from '../models/Organization.model.js';

/**
 * Protect routes - require authentication
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id)
        .select('-password -refreshToken')
        .populate('organization');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user is active
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      // Check if organization is active
      if (!req.user.organization.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Organization is deactivated'
        });
      }

      // Check subscription status
      if (!req.user.organization.isSubscriptionActive) {
        return res.status(403).json({
          success: false,
          message: 'Subscription expired. Please renew your subscription.'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};

/**
 * Authorize based on roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

/**
 * Check specific permission
 */
export const checkPermission = (resource, action) => {
  return (req, res, next) => {
    if (!req.user.hasPermission(resource, action)) {
      return res.status(403).json({
        success: false,
        message: `You don't have permission to ${action} ${resource}`
      });
    }
    next();
  };
};

/**
 * Check organization limit
 */
export const checkLimit = (resource) => {
  return async (req, res, next) => {
    try {
      const organization = await Organization.findById(req.user.organization._id);

      if (organization.hasReachedLimit(resource)) {
        return res.status(403).json({
          success: false,
          message: `You have reached your ${resource} limit. Please upgrade your plan.`,
          limit: organization.subscription.limits[resource],
          usage: organization.usage[resource]
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking limit',
        error: error.message
      });
    }
  };
};

/**
 * Check organization feature
 */
export const checkFeature = (feature) => {
  return (req, res, next) => {
    if (!req.user.organization.hasFeature(feature)) {
      return res.status(403).json({
        success: false,
        message: `This feature is not available in your plan. Please upgrade to access ${feature}.`,
        feature,
        currentPlan: req.user.organization.subscription.plan
      });
    }
    next();
  };
};

/**
 * Optional authentication - sets user if token is provided
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id)
          .select('-password -refreshToken')
          .populate('organization');
      } catch (error) {
        // Token invalid, continue without user
      }
    }

    next();
  } catch (error) {
    next();
  }
};

export default { protect, authorize, checkPermission, checkLimit, checkFeature, optionalAuth };
