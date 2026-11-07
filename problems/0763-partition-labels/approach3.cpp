#include <algorithm>
#include <string>
#include <vector>
class Solution {
public:
    std::vector<int> partitionLabels(std::string s) {
        int last[26]; // each letter's last index // @viz last
        for (int i = 0; i < (int)s.size(); ++i) last[s[i] - 'a'] = i; // later ones overwrite // @viz last
        std::vector<int> res; // @viz init
        int start = 0, end = 0; // @viz init
        for (int i = 0; i < (int)s.size(); ++i) { // @viz scan
            end = std::max(end, last[s[i] - 'a']); // this part must reach at least this letter's last copy // @viz scan
            if (i == end) { // every letter so far ends here: cut // @viz cut
                res.push_back(end - start + 1); // @viz cut
                start = i + 1; // @viz cut
            }
        }
        return res; // @viz return
    }
};
