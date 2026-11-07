#include <list>
#include <unordered_map>
#include <utility>
class LRUCache {
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        auto it = pos.find(key);
        if (it == pos.end()) return -1;
        order.splice(order.begin(), order, it->second); // O(1): move the node to the front
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = pos.find(key);
        if (it != pos.end()) {
            it->second->second = value;
            order.splice(order.begin(), order, it->second);
            return;
        }
        if (static_cast<int>(order.size()) == cap) {
            pos.erase(order.back().first); // the least recent is at the back
            order.pop_back();
        }
        order.emplace_front(key, value);
        pos[key] = order.begin();
    }

private:
    int cap;
    std::list<std::pair<int, int>> order; // std::list is a doubly linked list
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> pos;
};
