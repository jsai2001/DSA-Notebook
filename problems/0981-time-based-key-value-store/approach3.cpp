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
        auto it = store.find(key); // @viz search
        if (it == store.end()) return ""; // @viz return
        auto& pairs = it->second; // @viz search
        int lo = 0, hi = pairs.size(); // find the first pair with time > timestamp // @viz search
        while (lo < hi) { // @viz search
            int mid = (lo + hi) / 2; // @viz search
            if (pairs[mid].first <= timestamp) lo = mid + 1; // @viz search
            else hi = mid; // @viz search
        }
        return lo ? pairs[lo - 1].second : ""; // the one just before it is the latest at or before timestamp // @viz return
    }
};
