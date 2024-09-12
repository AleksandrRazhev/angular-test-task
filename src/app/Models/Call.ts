export interface Call extends NewCall {
  id: number;
  callType?: CallType;
}

export interface NewCall {
  username: string;
  timestampStart: number;
  timestampEnd: number;
  callDuration: number;
}

export type CallType = 'A' | 'B' | 'C' | 'D';
