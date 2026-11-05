#include <array>
#include <string>
#include <vector>
class Solution {
public:
    std::string minWindow(std::string s, std::string t) {
        std::array<int, 128> need{}, have{}; // @viz init
        std::vector<char> letters; // the distinct letters of t // @viz init
        for (char c : t) // @viz init
            if (need[c]++ == 0) letters.push_back(c); // @viz init
        int m = (int)s.size(); // @viz init
        int bestStart = 0, bestLen = m + 1; // no window yet // @viz init
        int left = 0; // @viz init
        // Does s[left..right] cover t? Look at every distinct letter of t.
        auto covers = [&] {
            for (char c : letters)
                if (have[c] < need[c]) return false;
            return true;
        };
        for (int right = 0; right < m; ++right) { // @viz grow
            ++have[s[right]]; // @viz grow
            while (covers()) { // @viz check
                if (right - left + 1 < bestLen) { // @viz record
                    bestStart = left; // @viz record
                    bestLen = right - left + 1; // @viz record
                }
                --have[s[left]]; // drop the leftmost letter and try again // @viz shrink
                ++left; // @viz shrink
            }
        }
        return bestLen <= m ? s.substr(bestStart, bestLen) : ""; // @viz return
    }
};
