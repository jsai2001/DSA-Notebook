#include <algorithm>
#include <string>
#include <vector>
class Solution {
public:
    int minDistance(std::string word1, std::string word2) {
        a = word1; // @viz init
        b = word2; // @viz init
        memo.assign(a.size(), std::vector<int>(b.size(), -1)); // memo[i][j]: edits to turn a[i..] into b[j..]; -1 = not known // @viz init
        return dist(0, 0); // @viz answer
    }
private:
    std::string a, b;
    std::vector<std::vector<int>> memo;
    int dist(int i, int j) { // @viz call
        int m = (int)a.size(), n = (int)b.size(); // @viz call
        if (i == m) return n - j; // word1 is used up: insert the rest of word2 // @viz edge
        if (j == n) return m - i; // word2 is used up: delete the rest of word1 // @viz edge
        if (memo[i][j] == -1) { // @viz memo
            if (a[i] == b[j]) { // same letter: keep it, no edit // @viz same
                memo[i][j] = dist(i + 1, j + 1); // @viz same
            } else { // @viz edit
                memo[i][j] = 1 + std::min({dist(i + 1, j + 1), // replace a[i] with b[j] // @viz edit
                                           dist(i + 1, j), // delete a[i] // @viz edit
                                           dist(i, j + 1)}); // insert b[j] // @viz edit
            }
        }
        return memo[i][j]; // @viz memo
    }
};
