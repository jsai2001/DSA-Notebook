#include <string>
#include <unordered_map>
#include <utility>
#include <vector>
class TimeMap {
    std::unordered_map<std::string, std::vector<std::pair<int, std::string>>> store; // key -> (timestamp, value), sorted // @viz init
public:
    TimeMap() {} // @viz init
    void set(std::string key, std::string value, int timestamp) {
        store[key].push_back({timestamp, value}); // timestamps only grow, so the list stays sorted // @viz set
    }
    std::string get(std::string key, int timestamp) {
        auto it = store.find(key); // @viz scan
        if (it == store.end()) return ""; // @viz none
        auto& pairs = it->second; // @viz scan
        for (int i = (int)pairs.size() - 1; i >= 0; --i) // newest first // @viz scan
            if (pairs[i].first <= timestamp) return pairs[i].second; // the first one at or before timestamp is the latest // @viz found
        return ""; // @viz none
    }
};
