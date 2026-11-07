#include <functional>
#include <queue>
#include <unordered_map>
#include <utility>
#include <vector>
class LRUCache {
public:
    LRUCache(int capacity) : cap(capacity) {} // @viz init

    int get(int key) {
        auto it = data.find(key); // @viz miss
        if (it == data.end()) return -1; // @viz miss
        touch(key); // @viz hit
        return it->second.first; // @viz hit
    }

    void put(int key, int value) {
        auto it = data.find(key); // @viz update
        if (it != data.end()) { // @viz update
            it->second.first = value; // @viz update
        } else { // @viz evict
            if (static_cast<int>(data.size()) == cap) { // full: find the least recently used // @viz evict
                while (true) { // @viz evict
                    auto [t, k] = heap.top(); // @viz evict
                    heap.pop(); // @viz evict
                    auto e = data.find(k); // @viz evict
                    if (e->second.second == t) { // this key's latest time: it's the real LRU // @viz evict
                        data.erase(e); // @viz evict
                        break; // @viz evict
                    } // otherwise the key was used again later: skip this old entry
                }
            }
            data[key] = {value, 0}; // @viz insert
        }
        touch(key); // @viz insert
    }

private:
    int cap;
    long long clock = 0; // @viz init
    std::unordered_map<int, std::pair<int, long long>> data; // key -> (value, time of last use) // @viz init
    // (time, key), smallest time on top; old entries stay until popped
    std::priority_queue<std::pair<long long, int>, std::vector<std::pair<long long, int>>, std::greater<>> heap; // @viz init

    void touch(int key) { // mark key as used now
        data[key].second = ++clock;
        heap.push({clock, key});
    }
};
