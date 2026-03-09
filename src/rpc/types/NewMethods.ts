export interface BestBlockHeader {
    hash: string;
    confirmations: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    nTx: number;
    previousblockhash?: string;
    nextblockhash?: string;
}

export interface DeploymentInfo {
    hash: string;
    height: number;
    deployments: {
        [key: string]: {
            type: string;
            active: boolean;
            height?: number;
            info?: {
                status: string;
                since?: number;
                status_next?: string;
                statistics?: {
                    period: number;
                    threshold: number;
                    elapsed: number;
                    count: number;
                    possible: boolean;
                };
            };
        };
    };
}

export interface MempoolEntryById {
    vsize: number;
    weight: number;
    time: number;
    height: number;
    descendantcount: number;
    descendantsize: number;
    ancestorcount: number;
    ancestorsize: number;
    wtxid: string;
    fees: {
        base: number;
        modified: number;
        ancestor: number;
        descendant: number;
    };
    depends: string[];
    spentby: string[];
    'bip125-replaceable': boolean;
    unbroadcast: boolean;
}

export interface GenerateBlockResult {
    hash: string;
    hex?: string;
}

export interface PeerAddressResult {
    success: boolean;
}

export interface NodeAddress {
    time: number;
    services: number;
    address: string;
    port: number;
    network: string;
}

export interface TestMempoolAcceptFees {
    base: number;
    'effective-feerate': number;
    'effective-includes': string[];
}

export interface TestMempoolAcceptResult {
    txid: string;
    wtxid: string;
    'package-error'?: string;
    allowed?: boolean;
    vsize?: number;
    fees?: TestMempoolAcceptFees;
    'reject-reason'?: string;
    'reject-details'?: string;
}

export interface PackageTxFees {
    base: number;
    'effective-feerate'?: number;
    'effective-includes'?: string[];
}

export interface PackageTxResult {
    txid: string;
    'other-wtxid'?: string;
    vsize?: number;
    fees?: PackageTxFees;
    error?: string;
}

export interface PackageResult {
    package_msg: string;
    'tx-results': {
        [wtxid: string]: PackageTxResult;
    };
    'replaced-transactions'?: string[];
}

export interface IndexInfo {
    [indexName: string]: {
        synced: boolean;
        best_block_height: number;
        best_block_hash?: string;
    };
}

export interface ChainLockVerification {
    valid: boolean;
    height?: number;
}

export interface WalletDescriptor {
    descriptor: string;
    checksum: string;
    isrange: boolean;
    issolvable: boolean;
    hasprivatekeys: boolean;
}

export interface HDKeyInfo {
    xpub: string;
    has_private: boolean;
    name: string;
    descriptors: Array<{
        desc: string;
        active: boolean;
    }>;
}

export interface ImportDescriptorsResult {
    success: boolean;
    warnings?: string[];
    error?: {
        code: number;
        message: string;
    };
}

export interface ListDescriptorsResult {
    wallet_name: string;
    descriptors: Array<{
        desc: string;
        timestamp: number;
        active: boolean;
        internal?: boolean;
        range?: number | [number, number];
        next?: number;
    }>;
}

export interface MigrateWalletResult {
    wallet_name: string;
    watchonly_name?: string;
    solvables_name?: string;
    backup_path: string;
}

export interface PsbtBumpFeeResult {
    psbt: string;
    origfee: number;
    fee: number;
    errors?: string[];
}

export interface SendResult {
    complete: boolean;
    txid?: string;
    hex?: string;
    psbt?: string;
}

export interface SendAllResult {
    complete: boolean;
    txid?: string;
    hex?: string;
    psbt?: string;
    fee?: number;
    weight?: number;
}

export interface SimulateTransactionResult {
    balance_change: number;
    feerate?: {
        effective_feerate: number;
        wtxids: string[];
    };
}

export interface UpgradeWalletResult {
    wallet_name: string;
    previous_version: number;
    current_version: number;
    result?: string;
    error?: string;
}

export interface ImportDescriptorRequest {
    desc: string;
    timestamp: number | 'now';
    active?: boolean;
    range?: number | [number, number];
    next_index?: number;
    internal?: boolean;
    label?: string;
}

export interface SendOptions {
    add_inputs?: boolean;
    include_unsafe?: boolean;
    add_to_wallet?: boolean;
    change_address?: string;
    change_position?: number;
    change_type?: string;
    fee_rate?: number | string;
    include_watching?: boolean;
    inputs?: Array<{
        txid: string;
        vout: number;
        weight?: number;
    }>;
    lock_unspents?: boolean;
    locktime?: number;
    max_tx_weight?: number;
    psbt?: boolean;
    subtract_fee_from_outputs?: number[];
    conf_target?: number;
    replaceable?: boolean;
    minconf?: number;
    maxconf?: number;
    send_max?: boolean;
}
