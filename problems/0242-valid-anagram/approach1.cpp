#include <algorithm>
#include <string>
class Solution {
public:
    bool isAnagram(std::string s, std::string t) {
        std::sort(s.begin(), s.end()); // anagrams have the same letters, so the same sorted order // @viz sort
        std::sort(t.begin(), t.end()); // @viz sort
        return s == t; // @viz sort
    }
};
