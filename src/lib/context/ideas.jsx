import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";
import { useUser} from "@clerk/clerk-react";

export const IDEAS_DATABASE_ID = import.meta.env.VITE_IDEAS_DATABASE_ID;
export const IDEAS_COLLECTION_ID = import.meta.env.VITE_IDEAS_COLLECTION_ID;

const IdeasContext = createContext();




export function useIdeas() {
  return useContext(IdeasContext);

}

export function IdeasProvider(props) {
  const user = useUser();
  const [ideas, setIdeas] = useState([]);

  


  async function add(idea) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      idea
    );
    setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
    await init(); // Refetch ideas to ensure we have 10 items
  }

  async function remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
    await init();
  }
   async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(1000)]
    );
    setIdeas(response.documents);
  }

  useEffect(() => {
    init();
  });


  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
