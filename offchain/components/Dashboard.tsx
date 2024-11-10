import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import {
  Address,
  applyDoubleCborEncoding,
  applyParamsToScript,
  Constr,
  Data,
  fromText,
  LucidEvolution,
  MintingPolicy,
  mintingPolicyToId,
  TxSignBuilder,
} from "@lucid-evolution/lucid";

const Script = {
  MintCheckRedeemer: applyDoubleCborEncoding(
    "58e6010100323232323232323225333003323232323253330083370e900018051baa001132533333300f003008008008008153330093371e6eb800d2210d48656c6c6f2c20576f726c64210014a22a660149212372656465656d6572203d3d202248656c6c6f2c20576f726c642122203f2046616c73650014a06eb8c030c02cdd50008b1805980600118050009805001180400098031baa001149854cc01124011856616c696461746f722072657475726e65642066616c73650013656153300249011372656465656d65723a2042797465417272617900165734ae7155ceaab9e5742ae895d201"
  ),

  MintCheckRedeemer2: applyDoubleCborEncoding(
    "590670010100323232323232323232323225333004323232323253323300a3001300c3754004264a6666660260082a6660166004601a6ea80104c94ccc0400040284c94cccccc05400402c02c4c8c94ccc04c0040344c94cccccc0600044c94ccc054c05000454ccc044cdc4a4008602600201e26464a66602e603400a2a66602e00c022264a66666603800202402402402426464a666034002028264a66666603e00202a02a02a264a666038603e0062a6603266e5924010a72656465656d65723a200037326664646464646002002444a6664666605000626464646464646601800400266e2922010128000025333024337100069007099b80483c80400c54ccc090cdc4001a410004266e00cdc0241002800690068b2999813800899b8a4881035b5d2900005133714911035b5f2000333300800133714911025d2900005223330090090023006001223330090090020013758604a0046eb4c08c004c8cdd81ba83023001374e60480026ea800c4c94ccc0940044cdc52441027b7d00003133714911037b5f2000323233001001003225333028001100315333028302b0011323330090093027001337149101023a20003330090093028001004302a0011323330090093027001337149101023a20003330090093028001300633003003302c002302a0013371491102207d000033756006264a66604a002266e29221025b5d00003133714911035b5f2000333300600133714911015d000032233300700700230040012233300700700200137580066e292201022c2000133005375a0040022646466e2922010268270000132333001001337006e3400920013371491101270000322253330233371000490000800899191919980300319b8000548004cdc599b80002533302633710004900a0a40c02903719b8b33700002a66604c66e2000520141481805206e0043370c004901019b8300148080cdc70020011bae0022222323300100100522533302500110051533302530280011330033027001005133004302700133002002302800122323300100100322533301e30150011337149110130000031533301e337100029000099b8a489012d003300200233702900000089980299b8400148050cdc599b803370a002900a240c00066002002444a66603666e2400920001001133300300333708004900a19b8b3370066e14009201448180004045220100132323232323232533301f533301f300e30213754604a604c00e294454cc0812411269735f6d696e74696e67203f2046616c73650014a02a66603ea66603e66e21200000114a22a660409201146d696e745f717479203e2030203f2046616c73650014a02a66603e64646600200200844a66604c00229404c94ccc08ccdd7981498131baa302900200414a2266006006002605200266e95200033024375200a660486ea00112f5c0294454cc0812414e636f6e73756d655f7574786f28696e707574732c204f75747075745265666572656e6365207b207472616e73616374696f6e5f69642c206f75747075745f696e646578207d29203f2046616c73650014a0294054ccc07ccdc4000a4000294454cc081241146d696e745f717479203c2030203f2046616c73650014a064a66604600203c264a666048604e00426eb4c08c00407cc094004c94ccc07cc038c084dd50008a5eb7bdb1804dd5981298111baa00132330010013756604a604c604c604c604c00644a6660480022980103d87a80001323232325333024337220340042a66604866e3c0680084cdd2a4000660526e980052f5c02980103d87a80001330060060033756604c0066eb8c090008c0a0008c098004dd61811800980f9baa017375a604260440046eb8c080004dd6180f800980d9baa011016375a00202a603800260380106eb8004c064018044c004c050008dc3a400401e6ea8004038038038038c054004c05400cdd6000805805980900098071baa004009009009009009375c6020601a6ea8008dc3a40002c601c601e004601a002601a0046016002600e6ea8004526153300549011856616c696461746f722072657475726e65642066616c73650013656153300349011472656465656d65723a204d7952656465656d6572001615330024915b657870656374205b50616972285f2c20717479295d203d0a202020206d696e740a2020202020207c3e206173736574732e746f6b656e7328706f6c6963795f6964290a2020202020207c3e20646963742e746f5f7061697273282900165734ae7155ceaab9e5573eae815d0aba257481"
  ),

  MintNFT: applyDoubleCborEncoding(
    "5905ae010100323232323232323232323223223225333008323232323253323300e300130103754004264a66666602e0082646464a666024600a0022a66602c602a6ea801c5400804054ccc048c00c00454ccc058c054dd50038a80100800818099baa00615330113372c92108616374696f6e3a200037326664646464646002002444a6664666604000626464646464646601800400266e292201012800002533301c337100069007099b80483c80400c54ccc070cdc4001a410004266e00cdc0241002800690068b299980f800899b8a4881035b5d2900005133714911035b5f2000333300800133714911025d2900005223330090090023006001223330090090020013758603a0046eb4c06c004c8cdd81ba8301b001374e60380026ea800c4c94ccc0740044cdc52441027b7d00003133714911037b5f20003232330010010032253330200011003153330203023001132333009009301f001337149101023a200033300900930200010043022001132333009009301f001337149101023a20003330090093020001300633003003302400230220013371491102207d000033756006264a66603a002266e29221025b5d00003133714911035b5f2000333300600133714911015d000032233300700700230040012233300700700200137580066e292201022c2000133005375a0040022646466e2922010268270000132333001001337006e34009200133714911012700003222533301b3371000490000800899191919980300319b8000548004cdc599b80002533301e33710004900a0a40c02903719b8b33700002a66603c66e2000520141481805206e0043370c004901019b8300148080cdc70020011bae0022222323300100100522533301d00110051533301d3020001133003301f001005133004301f001330020023020001223233001001003225333016300900113371491101300000315333016337100029000099b8a489012d003300200233702900000089980299b8400148050cdc599b803370a002900a240c00066002002444a66602666e2400920001001133300300333708004900a19b8b3370066e14009201448180004015220100132323253330133006301537540102a666026a6660266008002294454cc0512401156d696e745f717479203d3d2031203f2046616c73650014a02a66602664646600200200844a66603400229404c94ccc05ccdd7980e980d1baa301d00200414a2266006006002603a00266e95200033018375201e660306ea00352f5c0294454cc0512414e636f6e73756d655f7574786f28696e707574732c204f75747075745265666572656e6365207b207472616e73616374696f6e5f69642c206f75747075745f696e646578207d29203f2046616c73650014a0294054ccc04ccdc3800a4002294454cc051241166d696e745f717479203d3d202d31203f2046616c73650014a064a66602e002024264a666030603600426eb4c05c00404cc064004c94ccc04cc010c054dd50008a5eb7bdb1804dd5980c980b1baa001323300100137566032603460346034603400644a6660300022980103d87a80001323232325333018337220140042a66603066e3c0280084cdd2a40006603a6e980052f5c02980103d87a8000133006006003375660340066eb8c060008c070008c068004dd6180b80098099baa007370e90010068068068069bae3014301137540046e1d2000163012301300230110013011002300f001300b37540022930a99804a491856616c696461746f722072657475726e65642066616c73650013656375a0026eb800454cc00d24011772656465656d657220616374696f6e3a20416374696f6e001615330024915b657870656374205b50616972285f2c20717479295d203d0a202020206d696e740a2020202020207c3e206173736574732e746f6b656e7328706f6c6963795f6964290a2020202020207c3e20646963742e746f5f7061697273282900165734ae7155ceaab9e5573eae815d0aba257481"
  ),
};

export default function Dashboard(props: {
  lucid: LucidEvolution;
  address: Address;
  setActionResult: (result: string) => void;
  onError: (error: any) => void;
}) {
  const { lucid, address, setActionResult, onError } = props;

  async function submitTx(tx: TxSignBuilder) {
    const txSigned = await tx.sign.withWallet().complete();
    const txHash = await txSigned.submit();

    return txHash;
  }

  type Action = () => Promise<void>;
  type ActionGroup = Record<string, Action>;

  const actions: Record<string, ActionGroup> = {
    CheckRedeemer: {
      mint: async () => {
        try {
          const mintingValidator: MintingPolicy = { type: "PlutusV3", script: Script.MintCheckRedeemer };

          const policyID = mintingPolicyToId(mintingValidator);
          const assetName = "Hello World Token";
          const mintedAssets = { [`${policyID}${fromText(assetName)}`]: 100n };

          const helloWorld = fromText("Hello, World!");
          const redeemer = Data.to(helloWorld);

          const tx = await lucid
            .newTx()
            .mintAssets(mintedAssets, redeemer)
            .attach.MintingPolicy(mintingValidator)
            .attachMetadata(721, {
              [policyID]: {
                [assetName]: {
                  name: assetName,
                  image: "https://avatars.githubusercontent.com/u/1",
                },
              },
            })
            .complete();

          submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },

      burn: async () => {
        try {
          const mintingValidator: MintingPolicy = { type: "PlutusV3", script: Script.MintCheckRedeemer };

          const policyID = mintingPolicyToId(mintingValidator);
          const assetName = "Hello World Token";
          const assetUnit = `${policyID}${fromText(assetName)}`;
          const burnedAssets = { [assetUnit]: -100n };

          const helloWorld = fromText("Hello, World!");
          const redeemer = Data.to(helloWorld);

          const utxos = await lucid.utxosAtWithUnit(address, assetUnit);

          const tx = await lucid.newTx().collectFrom(utxos).mintAssets(burnedAssets, redeemer).attach.MintingPolicy(mintingValidator).complete();

          submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },
    },

    CheckRedeemer2: {
      mint: async () => {
        try {
          const utxos = await lucid.wallet().getUtxos();
          const utxo = utxos[0];

          const txHash = String(utxo.txHash);
          const txIndex = BigInt(utxo.outputIndex);

          const mintingValidator: MintingPolicy = { type: "PlutusV3", script: Script.MintCheckRedeemer2 };

          const policyID = mintingPolicyToId(mintingValidator);
          const assetName = "Consume UTxO Token";
          const mintedAssets = { [`${policyID}${fromText(assetName)}`]: 20n };

          const outputReference = [txHash, txIndex];
          const isMinting = new Constr(1, []); // True

          const myRedeemer = new Constr(0, [outputReference, isMinting]);
          const redeemer = Data.to(myRedeemer);

          const tx = await lucid
            .newTx()
            .collectFrom([utxo])
            .mintAssets(mintedAssets, redeemer)
            .attach.MintingPolicy(mintingValidator)
            .attachMetadata(721, {
              [policyID]: {
                [assetName]: {
                  name: assetName,
                  image: "https://avatars.githubusercontent.com/u/2",
                },
              },
            })
            .complete();

          submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },

      burn: async () => {
        try {
          const mintingValidator: MintingPolicy = { type: "PlutusV3", script: Script.MintCheckRedeemer2 };

          const policyID = mintingPolicyToId(mintingValidator);
          const assetName = "Consume UTxO Token";
          const assetUnit = `${policyID}${fromText(assetName)}`;
          const burnedAssets = { [assetUnit]: -20n };

          const utxos = await lucid.utxosAtWithUnit(address, assetUnit);

          const outputReference = ["", 0n];
          const isMinting = new Constr(0, []); // False

          const myRedeemer = new Constr(0, [outputReference, isMinting]);
          const redeemer = Data.to(myRedeemer);

          const tx = await lucid.newTx().collectFrom(utxos).mintAssets(burnedAssets, redeemer).attach.MintingPolicy(mintingValidator).complete();

          submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },
    },

    NFT: {
      mint: async () => {
        try {
          const utxos = await lucid.wallet().getUtxos();
          const utxo = utxos[0];

          const txHash = String(utxo.txHash);
          const txIndex = BigInt(utxo.outputIndex);

          const mintingScript = applyParamsToScript(Script.MintNFT, [txHash, txIndex]);
          const mintingValidator: MintingPolicy = { type: "PlutusV3", script: applyDoubleCborEncoding(mintingScript) };

          localStorage.setItem("nftMintingScript", mintingValidator.script);
          console.log({
            nftMintingScript: localStorage.getItem("nftMintingScript"),
          });

          const policyID = mintingPolicyToId(mintingValidator);
          const assetName = "Action NFT";
          const mintedNFT = { [`${policyID}${fromText(assetName)}`]: 1n };

          // Action:
          const mint = new Constr(0, []);
          const redeemer = Data.to(mint);

          const tx = await lucid
            .newTx()
            .collectFrom([utxo])
            .mintAssets(mintedNFT, redeemer)
            .attach.MintingPolicy(mintingValidator)
            .attachMetadata(721, {
              [policyID]: {
                [assetName]: {
                  name: assetName,
                  image: "https://avatars.githubusercontent.com/u/3",
                },
              },
            })
            .complete();

          submitTx(tx).then(setActionResult).catch(onError);
        } catch (error) {
          onError(error);
        }
      },

      burn: async () => {
        try {
          const nftMintingScript = localStorage.getItem("nftMintingScript");
          if (!nftMintingScript) throw "You must mint an NFT First!";

          const mintingValidator: MintingPolicy = {
            type: "PlutusV3",
            script: nftMintingScript,
          };

          const policyID = mintingPolicyToId(mintingValidator);
          const assetName = "Action NFT";
          const assetUnit = `${policyID}${fromText(assetName)}`;
          const burnedNFT = { [assetUnit]: -1n };

          // Action:
          const burn = new Constr(1, []);
          const redeemer = Data.to(burn);

          const utxos = await lucid.utxosAtWithUnit(address, assetUnit);

          const tx = await lucid.newTx().collectFrom(utxos).mintAssets(burnedNFT, redeemer).attach.MintingPolicy(mintingValidator).complete();

          submitTx(tx)
            .then((result) => {
              setActionResult(result);
              localStorage.clear();
            })
            .catch(onError);
        } catch (error) {
          onError(error);
        }
      },
    },
  };

  return (
    <div className="flex flex-col gap-2">
      <span>{address}</span>

      <Accordion variant="splitted">
        {/* Check Redeemer */}
        <AccordionItem key="2" aria-label="Accordion 2" title="Check Redeemer">
          <div className="flex flex-wrap gap-2 mb-2">
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg capitalize"
              radius="full"
              onClick={actions.CheckRedeemer.mint}
            >
              Mint
            </Button>
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg capitalize"
              radius="full"
              onClick={actions.CheckRedeemer.burn}
            >
              Burn
            </Button>
          </div>
        </AccordionItem>

        {/* Check Redeemer2 */}
        <AccordionItem key="3" aria-label="Accordion 3" title="Check Redeemer2">
          <div className="flex flex-wrap gap-2 mb-2">
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg capitalize"
              radius="full"
              onClick={actions.CheckRedeemer2.mint}
            >
              Mint
            </Button>
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg capitalize"
              radius="full"
              onClick={actions.CheckRedeemer2.burn}
            >
              Burn
            </Button>
          </div>
        </AccordionItem>

        {/* NFT */}
        <AccordionItem key="4" aria-label="Accordion 4" title="NFT">
          <div className="flex flex-wrap gap-2 mb-2">
            <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg capitalize" radius="full" onClick={actions.NFT.mint}>
              Mint
            </Button>
            <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg capitalize" radius="full" onClick={actions.NFT.burn}>
              Burn
            </Button>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
