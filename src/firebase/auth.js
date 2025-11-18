import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, firestore } from './config'

/**
 * Create a new user account
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} displayName - User display name
 * @param {string} companyCode - Company code for joining
 * @param {string} role - User role (employee, manager, admin)
 */
export async function registerUser(email, password, displayName, companyCode, role = 'employee') {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, { displayName })

    // Verify company code exists
    const companyRef = doc(firestore, 'companies', companyCode)
    const companyDoc = await getDoc(companyRef)

    if (!companyDoc.exists()) {
      throw new Error('رمز الشركة غير صحيح')
    }

    const companyData = companyDoc.data()

    // Create user document in Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      companyCode: companyCode,
      companyName: companyData.name,
      role: role,
      avatar: null,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      isActive: true
    })

    // Add user to company's users list
    const companyUsersRef = doc(firestore, 'companies', companyCode, 'users', user.uid)
    await setDoc(companyUsersRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: role,
      joinedAt: serverTimestamp()
    })

    return { success: true, user }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: getErrorMessage(error) }
  }
}

/**
 * Sign in existing user
 * @param {string} email - User email
 * @param {string} password - User password
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update last login time
    await updateDoc(doc(firestore, 'users', user.uid), {
      lastLogin: serverTimestamp()
    })

    return { success: true, user }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: getErrorMessage(error) }
  }
}

/**
 * Sign out current user
 */
export async function logoutUser() {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: getErrorMessage(error) }
  }
}

/**
 * Send password reset email
 * @param {string} email - User email
 */
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    console.error('Password reset error:', error)
    return { success: false, error: getErrorMessage(error) }
  }
}

/**
 * Get current user data from Firestore
 * @param {string} uid - User ID
 */
export async function getUserData(uid) {
  try {
    const userDoc = await getDoc(doc(firestore, 'users', uid))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    }
    return { success: false, error: 'المستخدم غير موجود' }
  } catch (error) {
    console.error('Get user data error:', error)
    return { success: false, error: getErrorMessage(error) }
  }
}

/**
 * Create a new company
 * @param {string} name - Company name
 * @param {string} ownerEmail - Owner email
 */
export async function createCompany(name, ownerEmail) {
  try {
    // Generate unique company code
    const code = generateCompanyCode()

    // Create company document
    await setDoc(doc(firestore, 'companies', code), {
      code: code,
      name: name,
      ownerEmail: ownerEmail,
      createdAt: serverTimestamp(),
      isActive: true,
      settings: {
        allowEmployeeInvite: true,
        requireApproval: false
      }
    })

    return { success: true, code }
  } catch (error) {
    console.error('Create company error:', error)
    return { success: false, error: getErrorMessage(error) }
  }
}

/**
 * Generate unique company code
 */
function generateCompanyCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing characters
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * Get user-friendly error messages
 */
function getErrorMessage(error) {
  const errorMessages = {
    'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
    'auth/invalid-email': 'البريد الإلكتروني غير صحيح',
    'auth/weak-password': 'كلمة المرور ضعيفة (يجب أن تكون 6 أحرف على الأقل)',
    'auth/user-not-found': 'المستخدم غير موجود',
    'auth/wrong-password': 'كلمة المرور غير صحيحة',
    'auth/too-many-requests': 'محاولات كثيرة جداً، حاول لاحقاً',
    'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت'
  }

  return errorMessages[error.code] || error.message || 'حدث خطأ غير متوقع'
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback)
}
