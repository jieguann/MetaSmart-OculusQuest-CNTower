using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CollectTower : MonoBehaviour
{
    
    public TextMesh dialog;
    public SolanaConnection Solana;

    private void OnTriggerEnter(Collider other)
    {
        Solana.GenerateRequest();
        Destroy(other.gameObject);
        dialog.text = "Congradulation, CN Tower is collected in your wallet";
    }
}
