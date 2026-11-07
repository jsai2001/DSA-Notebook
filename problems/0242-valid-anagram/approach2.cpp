#include <string>
#include <unordered_map>
class Solution {
public:
    bool isAnagram(std::string s, std::string t) {
        if (s.size() != t.size()) return false; // @viz len
        std::unordered_map<char, int> count; // letter -> (times in s) - (times in t) // @viz count
        for (size_t i = 0; i < s.size(); ++i) { // @viz count
            ++count[s[i]]; // @viz count
            --count[t[i]]; // @viz count
        }
        for (auto& [ch, v] : count) // @viz check
            if (v != 0) return false; // @viz check
        return true; // every letter evens out // @viz check
    }
};
