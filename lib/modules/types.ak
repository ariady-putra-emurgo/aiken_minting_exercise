pub type Action {
  Mint
  Burn
}

pub type MyRedeemer {
  output_reference: (ByteArray, Int),
  is_minting: Bool,
}
