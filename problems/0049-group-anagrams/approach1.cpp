#include <algorithm>
#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::vector<std::vector<std::string>> groups; // each group: words that are anagrams of each other // @viz init
        for (const std::string& s : strs) { // @viz word
            bool placed = false;
            for (auto& group : groups) { // compare with one word from each group so far // @viz compare
                if (isAnagram(group[0], s)) { // @viz compare
                    group.push_back(s); // @viz join
                    placed = true; // @viz join
                    break; // @viz join
                }
            }
            if (!placed) groups.push_back({s}); // no group matched: s starts a new one // @viz new
        }
        return groups; // @viz return
    }
private:
    static bool isAnagram(std::string a, std::string b) { // same letters, same number of times
        if (a.size() != b.size()) return false;
        std::sort(a.begin(), a.end());
        std::sort(b.begin(), b.end());
        return a == b;
    }
};
