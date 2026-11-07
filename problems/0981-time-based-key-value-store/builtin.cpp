#include <map>
#include <string>
#include <unordered_map>
class TimeMap {
    std::unordered_map<std::string, std::map<int, std::string>> store; // a sorted map per key
public:
    TimeMap() {}
    void set(std::string key, std::string value, int timestamp) { store[key][timestamp] = value; }
    std::string get(std::string key, int timestamp) {
        auto it = store.find(key);
        if (it == store.end()) return "";
        auto up = it->second.upper_bound(timestamp); // first time > timestamp
        return up == it->second.begin() ? "" : std::prev(up)->second;
    }
};
