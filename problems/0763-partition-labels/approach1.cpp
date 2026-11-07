#include <algorithm>
#include <string>
#include <vector>
class Solution {
public:
    std::vector<int> partitionLabels(std::string s) {
        std::vector<int> res; // @viz init
        int start = 0, n = s.size(); // @viz init
        while (start < n) { // build one part at a time // @viz part
            int end = s.rfind(s[start]); // the part must reach this letter's last copy // @viz part
            for (int j = start; j <= end; ++j) // every letter inside pushes the end to its own last copy // @viz grow
                end = std::max(end, (int)s.rfind(s[j])); // rfind scans from the back: O(n) each time // @viz grow
            res.push_back(end - start + 1); // @viz cut
            start = end + 1; // @viz cut
        }
        return res; // @viz return
    }
};
