#!/usr/bin/env python3
from utils import get_mem0_client

if __name__ == "__main__":
    m = get_mem0_client()
    # Save something:
    print(m.add("I love pickles.", user_id="user"))

    # Search your memories:
    results = m.search("pickles", user_id="user", limit=5)
    print("Search results:", results)

    # List everything:
    all_memories = m.get_all(user_id="user")
    print("All memories:", all_memories)
