#include <utility>
#include <vector>
class LRUCache {
public:
    LRUCache(int capacity) : cap(capacity) {} // @viz init

    int get(int key) {
        int i = find(key); // @viz get
        if (i == -1) return -1; // @viz miss
        auto item = items[i]; // used now: move it to the back // @viz hit
        items.erase(items.begin() + i); // @viz hit
        items.push_back(item); // @viz hit
        return item.second; // @viz hit
    }

    void put(int key, int value) {
        int i = find(key); // @viz put
        if (i != -1) { // already there: drop the old entry first // @viz update
            items.erase(items.begin() + i); // @viz update
        } else if (static_cast<int>(items.size()) == cap) { // full: evict the least recently used, at the front // @viz evict
            items.erase(items.begin()); // @viz evict
        }
        items.push_back({key, value}); // the newest goes at the back // @viz insert
    }

private:
    int cap;
    std::vector<std::pair<int, int>> items; // (key, value), least recently used first // @viz init

    int find(int key) const { // a linear scan: O(capacity)
        for (int i = 0; i < static_cast<int>(items.size()); ++i) {
            if (items[i].first == key) return i;
        }
        return -1;
    }
};
