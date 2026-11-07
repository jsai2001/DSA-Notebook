#include <string>
#include <unordered_map>
class TimeMap {
    std::unordered_map<std::string, std::string> at; // key + "#" + timestamp -> value // @viz init
public:
    TimeMap() {} // @viz init
    void set(std::string key, std::string value, int timestamp) {
        at[key + "#" + std::to_string(timestamp)] = value; // @viz set
    }
    std::string get(std::string key, int timestamp) {
        for (int t = timestamp; t >= 1; --t) { // try timestamp, timestamp - 1, ... down to 1 // @viz scan
            auto it = at.find(key + "#" + std::to_string(t)); // @viz scan
            if (it != at.end()) return it->second; // @viz found
        }
        return ""; // nothing set at or before timestamp // @viz none
    }
};
