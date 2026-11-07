#include <string>
class Solution {
public:
    bool isAnagram(std::string s, std::string t) {
        if (s.size() != t.size()) return false; // @viz len
        int count[26] = {}; // one slot per letter a..z // @viz count
        for (char ch : s) ++count[ch - 'a']; // @viz count
        for (char ch : t) // @viz use
            if (--count[ch - 'a'] < 0) return false; // t has more of this letter than s // @viz use, short
        return true; // same length and no letter went negative: every count is 0 // @viz return
    }
};
