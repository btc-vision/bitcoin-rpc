import { BitcoinVerbosity } from './BitcoinVerbosity.js';
import { VIn, VOut } from './BlockData.js';

export interface BitcoinRawTransactionParams {
    txId: string;
    blockHash?: string;
    verbose?: BitcoinVerbosity;
}

export interface ScriptSig {
    asm: string;
    hex: string;
}

export interface ScriptPubKey {
    asm?: string;
    hex: string;
    reqSigs?: number;
    type?: string; // Consider enum if there are known, limited values for type
    addresses?: string[];
    address?: string; // Optional as it might not be present for unconfirmed transactions
}

export interface IRawTransaction {
    /** The transaction id (little-endian tx hash) */
    readonly txid: string;

    /** The same hash in (possibly) witness-stripped form */
    readonly hash: string;

    /** Raw byte length of the serialized transaction */
    readonly size: number;

    /** Virtual size (vbytes) accounting for witness discount */
    readonly vsize: number;

    /** Weight units: vsize × 4 minus up to 3 bytes */
    readonly weight: number;

    /** nVersion field */
    readonly version: number;

    /** nLockTime field */
    readonly locktime: number;

    readonly vin: VIn[];

    readonly vout: VOut[];
}

export interface TransactionDetail extends IRawTransaction {
    in_active_chain?: boolean; // Optional as it only appears with "blockhash" argument
    hex: string;
    blockhash?: string; // Optional as it might not be present for unconfirmed transactions
    confirmations?: number; // Optional for similar reason as blockhash
    blocktime?: number; // Optional for similar reason as blockhash
    time?: number; // Optional for similar reason as blockhash
}

export type RawTransaction<V extends BitcoinVerbosity> = V extends BitcoinVerbosity.RAW
    ? string
    : TransactionDetail;
