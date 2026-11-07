#include <algorithm>
#include <string>
class Solution {
public:
    int characterReplacement(std::string s, int k) {
        int best = 0, n = s.size(); // @viz init
        for (int i = 0; i < n; ++i) { // every start // @viz start
            int count[26] = {}, top = 0; // top: count of the most common letter in s[i..j] // @viz start
            for (int j = i; j < n; ++j) { // every end // @viz grow
                top = std::max(top, ++count[s[j] - 'A']); // @viz grow
                if (j - i + 1 - top > k) break; // more than k letters to change: longer ends won't work either // @viz stop
                best = std::max(best, j - i + 1); // @viz best
            }
        }
        return best; // @viz return
    }
};
