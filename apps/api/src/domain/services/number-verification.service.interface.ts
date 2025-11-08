/**
 * Number Verification Service
 * 
 * APIs disponibles:
 * 
 * 1. Verify (POST /number-verification/v0/verify)
 *    Compara un número de teléfono con el asociado al access_token
 *    Request: { "phoneNumber": "541122358032" }
 *    Response: { "devicePhoneNumberVerified": true/false }
 *    Formato número: código país + código área + número (ej: 541122358032)
 * 
 * 2. Device Phone Number (GET /number-verification/v0/device-phone-number)
 *    Devuelve el número asociado al access_token
 *    Response: { "devicePhoneNumber": "541122358032" }
 */

export interface VerifyPhoneNumberRequest {
  phoneNumber?: string;
  hashedPhoneNumber?: string;
}

export interface VerifyPhoneNumberResponse {
  devicePhoneNumberVerified: boolean;
}

export interface SharePhoneNumberResponse {
  devicePhoneNumber: string;
}

export interface INumberVerificationService {
  /**
   * Verifica si un número de teléfono coincide con el asociado al access_token
   * @param request - Objeto con phoneNumber (formato: código país + código área + número, ej: 541122358032)
   * @returns Promise con devicePhoneNumberVerified (true si coinciden, false si no)
   * @example
   * verifyPhoneNumber({ phoneNumber: "541122358032" })
   * // Returns: { devicePhoneNumberVerified: true }
   */
  verifyPhoneNumber(request: VerifyPhoneNumberRequest): Promise<VerifyPhoneNumberResponse>;

  /**
   * Obtiene el número de teléfono asociado al access_token
   * @returns Promise con devicePhoneNumber (ej: "541122358032")
   * @example
   * sharePhoneNumber()
   * // Returns: { devicePhoneNumber: "541122358032" }
   */
  sharePhoneNumber(): Promise<SharePhoneNumberResponse>;
}
