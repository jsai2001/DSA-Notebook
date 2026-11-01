#include <string>
#include <unordered_map>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> groups; // letter counts -> the words that have them // @viz init
        for (const std::string& s : strs) { // @viz word
            int count[26] = {}; // how many a's, b's, ..., z's // @viz count
            for (char ch : s) count[ch - 'a']++; // @viz count
            std::string key; // e.g. "1#0#0#...": a separator after each count, so 1,11 and 11,1 differ // @viz key
            for (int c : count) key += std::to_string(c) + '#'; // @viz key
            groups[key].push_back(s); // @viz add
        }
        std::vector<std::vector<std::string>> result; // @viz return
        for (auto& [key, words] : groups) result.push_back(std::move(words)); // @viz return
        return result; // @viz return
    }
};
