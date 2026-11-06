#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> partition(std::string s) {
        const int n = s.size(); // @viz table
        std::vector<std::vector<char>> pal(n, std::vector<char>(n, 0)); // @viz table
        for (int i = n - 1; i >= 0; --i) { // @viz table
            for (int j = i; j < n; ++j) { // @viz table
                pal[i][j] = s[i] == s[j] && (j - i < 2 || pal[i + 1][j - 1]); // @viz table
            }
        }
        // parts[i] = every way to split the suffix s[i:]. parts[n] has one way: no pieces.
        std::vector<std::vector<std::vector<std::string>>> parts(n + 1); // @viz init
        parts[n] = {{}}; // @viz init
        for (int i = n - 1; i >= 0; --i) { // shortest suffix first // @viz suffix
            for (int end = i; end < n; ++end) { // first piece = s[i..end] // @viz try
                if (!pal[i][end]) continue; // @viz try
                const std::string piece = s.substr(i, end - i + 1); // @viz join
                for (const auto& rest : parts[end + 1]) { // every way to split what's left // @viz join
                    std::vector<std::string> split{piece}; // @viz join
                    split.insert(split.end(), rest.begin(), rest.end()); // @viz join
                    parts[i].push_back(std::move(split)); // @viz join
                }
            }
        }
        return parts[0]; // @viz return
    }
};
