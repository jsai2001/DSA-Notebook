#include <unordered_map>
class LRUCache {
    struct Node {
        int key, val;
        Node* prev = nullptr;
        Node* next = nullptr;
        Node(int k = 0, int v = 0) : key(k), val(v) {}
    };

public:
    LRUCache(int capacity) : cap(capacity) { // @viz init
        head.next = &tail; // sentinels: most recent after head, least recent before tail // @viz init
        tail.prev = &head; // @viz init
    }

    ~LRUCache() {
        for (auto& [k, node] : map) delete node;
    }

    int get(int key) {
        auto it = map.find(key); // O(1): the map finds the node // @viz miss
        if (it == map.end()) return -1; // @viz miss
        unlink(it->second); // O(1): move it to the front // @viz hit
        pushFront(it->second); // @viz hit
        return it->second->val; // @viz hit
    }

    void put(int key, int value) {
        auto it = map.find(key); // @viz update
        Node* node;
        if (it != map.end()) { // @viz update
            node = it->second; // @viz update
            node->val = value; // @viz update
            unlink(node); // @viz update
        } else { // @viz evict
            if (static_cast<int>(map.size()) == cap) { // full: evict the node just before the tail // @viz evict
                Node* lru = tail.prev; // @viz evict
                unlink(lru); // @viz evict
                map.erase(lru->key); // that's why each node keeps its key // @viz evict
                delete lru; // @viz evict
            }
            node = new Node(key, value); // @viz insert
            map[key] = node; // @viz insert
        }
        pushFront(node); // @viz insert
    }

private:
    int cap;
    Node head, tail; // @viz init
    std::unordered_map<int, Node*> map; // key -> its node // @viz init

    static void unlink(Node* n) {
        n->prev->next = n->next;
        n->next->prev = n->prev;
    }
    void pushFront(Node* n) {
        n->prev = &head;
        n->next = head.next;
        head.next->prev = n;
        head.next = n;
    }
};
