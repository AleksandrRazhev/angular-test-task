export interface Call extends NewCall {
  id: string;
  callType?: CallType;
}

export interface NewCall {
  username: string;
  timestampStart: number;
  timestampEnd: number;
}

export type CallType = 'a' | 'b' | 'c' | 'd';
