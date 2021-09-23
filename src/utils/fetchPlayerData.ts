export async function fetchPlayerData<T>(
    request: string
  ): Promise<T> {

    
      const response = await fetch(request, {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }});
      const body = await response.json();
      console.log(body);
      return body;
    
    
  }
  