/** BIP9 soft-fork deployment names recognized by getblocktemplate */
export type BlockTemplateRule = 'segwit' | 'signet' | 'csv' | 'taproot' | (string & {});

/** BIP22/BIP23 mutable field values indicating how the template may be modified */
export type BlockTemplateMutable =
    | 'time'
    | 'transactions'
    | 'transactions/add'
    | 'transactions/remove'
    | 'prevblock'
    | 'coinbase'
    | 'coinbase/append'
    | 'generation'
    | (string & {});

/** BIP22/BIP23 client capabilities for the getblocktemplate request */
export type BlockTemplateCapability =
    | 'longpoll'
    | 'coinbasetxn'
    | 'coinbasevalue'
    | 'proposal'
    | 'serverlist'
    | 'workid'
    | (string & {});

/** Individual transaction entry returned by getblocktemplate */
export interface BlockTemplateTx {
    /** Raw serialized transaction hex (byte-for-byte) */
    readonly data: string;
    /** Transaction ID in display byte order (little-endian hex, 64 chars) */
    readonly txid: string;
    /** Witness transaction ID (wtxid) in display byte order (little-endian hex, 64 chars, includes witness data) */
    readonly hash: string;
    /** Transaction fee in satoshis (inputs minus outputs). May be absent if unknown. */
    readonly fee: number;
    /** Total SigOps cost as counted for block limits. May be absent if unknown. */
    readonly sigops: number;
    /** Total transaction weight as counted for block limits */
    readonly weight: number;
    /** 1-based indices into the template's transactions array identifying txs this one depends on */
    readonly depends?: readonly number[];
}

/** Coinbase auxiliary data from getblocktemplate */
export interface CoinbaseAux {
    /** Flags hex to include in coinbase scriptSig */
    readonly flags?: string;
    /** Additional auxiliary key-value pairs the node may include */
    readonly [key: string]: string | undefined;
}

/** Response from the getblocktemplate RPC (BIP22/BIP23/BIP9/BIP141/BIP145/BIP325) */
export interface BlockTemplate {
    /** Server-side supported capabilities (e.g. ["proposal"]) */
    readonly capabilities?: readonly string[];
    /** Block version (includes BIP9 versionbits) */
    readonly version: number;
    /** Active BIP9 soft-fork deployment names enforced on this template */
    readonly rules?: readonly BlockTemplateRule[];
    /** Map of pending, supported versionbit deployments to their bit positions */
    readonly vbavailable?: Readonly<Record<string, number>>;
    /** Bitmask of versionbits the server requires set in submissions */
    readonly vbrequired?: number;
    /** Previous block hash in display byte order (hex, 64 chars) */
    readonly previousblockhash: string;
    /** Non-coinbase transactions to include in the block */
    readonly transactions: readonly BlockTemplateTx[];
    /** Data to include in the coinbase scriptSig */
    readonly coinbaseaux: CoinbaseAux;
    /** Maximum satoshi value allowed as coinbase output (block reward + total fees) */
    readonly coinbasevalue: number;
    /** Coinbase transaction fields (present when client advertises 'coinbasetxn' capability) */
    readonly coinbasetxn?: Readonly<Record<string, unknown>>;
    /** Identifier for BIP22 long poll requests; include in next request to wait for updates */
    readonly longpollid?: string;
    /** Block target hash in display byte order (hex, 64 chars) */
    readonly target: string;
    /** Minimum valid nTime for the block (unix timestamp, seconds since epoch) */
    readonly mintime: number;
    /** Ways the client is allowed to modify the template */
    readonly mutable?: readonly BlockTemplateMutable[];
    /** Valid nonce range as concatenated min+max hex (typically "00000000ffffffff") */
    readonly noncerange?: string;
    /** Recommended nTime for the block header (unix timestamp, seconds since epoch) */
    readonly curtime: number;
    /** Compact-encoded difficulty target (hex, 8 chars) */
    readonly bits: string;
    /** Height of the next block to be mined */
    readonly height: number;
    /** BIP325 challenge script hex (present only on signet networks when 'signet' is in rules) */
    readonly signet_challenge?: string;
    /** Default BIP141 witness commitment hex (present when 'segwit' is in rules) */
    readonly default_witness_commitment?: string;
    /** Maximum allowed block weight in weight units */
    readonly weightlimit?: number;
    /** Maximum allowed total sigop cost */
    readonly sigoplimit?: number;
    /** Maximum allowed block size in bytes (deprecated, use weightlimit) */
    readonly sizelimit?: number;
}
