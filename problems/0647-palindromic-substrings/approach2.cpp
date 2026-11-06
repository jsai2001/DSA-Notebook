#include <string>
#include <vector>
class Solution {
public:
    int countSubstrings(std::string s) {
        const int n = s.size(); // @viz init
        std::vector<std::vector<char>> pal(n, std::vector<char>(n, 0)); // pal[i][j]: is s[i..j] a palindrome? // @viz init
        int count = 0; // @viz init
        for (int i = n - 1; i >= 0; --i) { // i from the end, so pal[i + 1] is ready // @viz row
            for (int j = i; j < n; ++j) { // @viz cell
                // Same ends, and the inside s[i+1..j-1] is a palindrome (or has 0-1 letters).
                if (s[i] == s[j] && (j - i < 2 || pal[i + 1][j - 1])) { // @viz cell
                    pal[i][j] = 1; // @viz count
                    ++count; // @viz count
                }
            }
        }
        return count; // @viz return
    }
};
