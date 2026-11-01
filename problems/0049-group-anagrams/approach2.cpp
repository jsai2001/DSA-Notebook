#include <algorithm>
#include <string>
#include <unordered_map>
#include <vector>
class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> groups; // sorted letters -> the words that have them // @viz init
        for (const std::string& s : strs) { // @viz word
            std::string key = s; // @viz key
            std::sort(key.begin(), key.end()); // anagrams sort to the same string: "eat", "tea" -> "aet" // @viz key
            groups[key].push_back(s); // @viz add
        }
        std::vector<std::vector<std::string>> result; // @viz return
        for (auto& [key, words] : groups) result.push_back(std::move(words)); // @viz return
        return result; // @viz return
    }
};
