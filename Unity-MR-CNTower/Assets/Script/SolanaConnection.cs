using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using SimpleJSON;

public class SolanaConnection : MonoBehaviour
{


    public string outputURL;
    [SerializeField] private string URL;
    public RuntimeImportBehaviour importer;
    private void Start()
    {

        GenerateRequest();


    }
    public void GenerateRequest()
    {
        StartCoroutine(ProcessRequest(URL));
    }

    private IEnumerator ProcessRequest(string uri)
    {
        using (UnityWebRequest request = UnityWebRequest.Get(uri))
        {
            yield return request.SendWebRequest();

            if (request.isNetworkError)
            {
                Debug.Log(request.error);
            }
            else
            {
                JSONNode itemsData = JSON.Parse(request.downloadHandler.text);



                Debug.Log(itemsData[0]["url"]);
                outputURL = itemsData[0]["url"];
                //importer.modelURL = outputURL;
                //importer.runTask();
            }
        }
    }
}

