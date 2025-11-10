export interface RetrieveDateRequest {
  phoneNumber: string;
}

export interface RetrieveDateResponse {
  latestDeviceChange: string | null;
}

export interface CheckDeviceSwapRequest {
  phoneNumber: string;
  maxAge?: number;
}

export interface CheckDeviceSwapResponse {
  swapped: boolean;
}

export interface IDeviceSwapService {
  retrieveDate(request: RetrieveDateRequest): Promise<RetrieveDateResponse>;
  checkDeviceSwap(request: CheckDeviceSwapRequest): Promise<CheckDeviceSwapResponse>;
}
