use aiken/crypto.{Blake2b_256, Hash}
use cardano/assets.{PolicyId}
use cardano/transaction.{OutputReference, Transaction}
use modules/functions.{consume_utxo, mint_qty}
use modules/types.{Action, Burn, Mint, MyRedeemer}

validator check_redeemer {
  mint(redeemer: ByteArray, _policy_id: PolicyId, _tx: Transaction) {
    todo @"Allow minting/burning when `redeemer` equals to ``Hello, World!``"
  }

  else(_) {
    fail
  }
}

validator check_redeemer_2 {
  mint(redeemer: MyRedeemer, policy_id: PolicyId, tx: Transaction) {
    todo @"Validate minting/burning based on `MyRedeemer.is_minting`"
    // If `is_minting` is `True`:
    // - check mint qty must be positive
    // - check `MyRedeemer.output_reference` UTxO must be consumed
    //
    // If `is_minting` is `False`:
    // - check mint qty must be negative
    //
    // Explain why solely trusting on redeemer data is a bad idea?
  }

  else(_) {
    fail
  }
}

validator nft(
  transaction_id: Hash<Blake2b_256, Transaction>,
  output_index: Int,
) {
  mint(redeemer action: Action, policy_id: PolicyId, tx: Transaction) {
    todo @"Validate minting/burning based on `action`"
    // If `action` is `Action.Mint`:
    // - check mint qty must equal to 1
    // - check `OutputReference(transaction_id, output_index)` UTxO must be consumed
    //
    // If `action` is `Action.Burn`:
    // - check mint qty must equal to -1
  }

  else(_) {
    fail
  }
}
