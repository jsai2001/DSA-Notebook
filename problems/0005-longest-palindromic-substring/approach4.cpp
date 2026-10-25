#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    std::string longestPalindrome(std::string s) {
        std::string t = "^#"; // "#" between chars; ^ and $ stop expansion // @viz build
        for (char c : s) { t += c; t += '#'; } // @viz build
        t += '$'; // @viz build
        std::vector<int> p(t.size(), 0); // p[i]: radius centered at t[i] // @viz build
        int center = 0, right = 0; // @viz build
        for (int i = 1; i + 1 < (int)t.size(); ++i) { // @viz loop
            if (i < right) { // @viz mirror
                p[i] = std::min(right - i, p[2 * center - i]); // reuse the mirror // @viz mirror
            }
            while (t[i + p[i] + 1] == t[i - p[i] - 1]) ++p[i]; // @viz expand
            if (i + p[i] > right) { // @viz update
                center = i; // @viz update
                right = i + p[i]; // @viz update
            }
        }
        int mid = std::max_element(p.begin(), p.end()) - p.begin(); // @viz answer
        return s.substr((mid - p[mid]) / 2, p[mid]); // @viz answer
    }
};
