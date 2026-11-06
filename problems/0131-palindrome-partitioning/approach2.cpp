#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> partition(std::string s) {
        this->s = s; // @viz table
        const int n = s.size(); // @viz table
        // pal[i][j]: is s[i..j] a palindrome? Built from short pieces to long ones.
        pal.assign(n, std::vector<char>(n, 0)); // @viz table
        for (int i = n - 1; i >= 0; --i) { // @viz table
            for (int j = i; j < n; ++j) { // @viz table
                pal[i][j] = s[i] == s[j] && (j - i < 2 || pal[i + 1][j - 1]); // @viz table
            }
        }
        backtrack(0); // @viz init
        return result; // @viz return
    }

private:
    std::string s;
    std::vector<std::vector<char>> pal;
    std::vector<std::vector<std::string>> result;
    std::vector<std::string> path;

    void backtrack(int start) {
        const int n = s.size();
        if (start == n) { // @viz done
            result.push_back(path); // a copy: path keeps changing // @viz done
            return; // @viz done
        }
        for (int end = start; end < n; ++end) { // @viz try
            if (pal[start][end]) { // O(1): look it up // @viz try
                path.push_back(s.substr(start, end - start + 1)); // choose // @viz choose
                backtrack(end + 1); // explore the rest // @viz choose
                path.pop_back(); // undo // @viz undo
            }
        }
    }
};
