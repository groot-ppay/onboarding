/**
 * SIM Swap Service
 * 
 * APIs disponibles:
 * 
 * 1. Retrieve Date (POST /sim-swap/v0/retrieve-date)
 *    Devuelve la última fecha en la que un número cambió la SIM
 *    Request: { "phoneNumber": "541124579103" }
 *    Response: { "latestSimChange": "2025-10-20T04:04:48.000Z" } o null si no cambió
 *    Formato número: código país + código área + número (ej: 541124579103)
 * 
 * 2. Check (POST /sim-swap/v0/check)
 *    Chequea si un número cambió la SIM dentro de un período de horas
 *    Request: { "phoneNumber": "541124585037", "maxAge": 250 }
 *    Response: { "swapped": true/false }
 *    maxAge: opcional, 1-2400 horas (default: 240)
 */

export interface RetrieveDateRequest {
  phoneNumber: string;
}

export interface RetrieveDateResponse {
  latestSimChange: string | null;
}

export interface CheckSimSwapRequest {
  phoneNumber: string;
  maxAge?: number;
}

export interface CheckSimSwapResponse {
  swapped: boolean;
}

export interface ISimSwapService {
  /**
   * Obtiene la última fecha en la que un número cambió la SIM
   * @param request - Objeto con phoneNumber (formato: código país + código área + número, ej: 541124579103)
   * @returns Promise con latestSimChange (fecha ISO o null si no cambió)
   * @throws HttpException con código 404 si el número es desconocido
   * @example
   * retrieveDate({ phoneNumber: "541124579103" })
   * // Returns: { latestSimChange: "2025-10-20T04:04:48.000Z" } o { latestSimChange: null }
   */
  retrieveDate(request: RetrieveDateRequest): Promise<RetrieveDateResponse>;

  /**
   * Chequea si un número cambió la SIM dentro de un período de horas
   * @param request - Objeto con phoneNumber y maxAge opcional (1-2400 horas, default: 240)
   * @returns Promise con swapped (true si cambió dentro del período, false si no)
   * @throws HttpException con código 404 si el número es desconocido
   * @example
   * checkSimSwap({ phoneNumber: "541124585037", maxAge: 250 })
   * // Returns: { swapped: true }
   */
  checkSimSwap(request: CheckSimSwapRequest): Promise<CheckSimSwapResponse>;
}
