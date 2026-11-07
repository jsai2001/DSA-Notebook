#include <algorithm>
#include <string>
#include <utility>
#include <vector>
class Solution {
public:
    std::vector<int> partitionLabels(std::string s) {
        std::vector<int> first(26, -1), last(26, -1); // each letter's first and last index // @viz spans
        for (int i = 0; i < (int)s.size(); ++i) { // @viz spans
            int k = s[i] - 'a'; // @viz spans
            if (first[k] < 0) first[k] = i; // @viz spans
            last[k] = i; // @viz spans
        }
        std::vector<std::pair<int, int>> spans; // @viz spans
        for (int k = 0; k < 26; ++k) if (first[k] >= 0) spans.push_back({first[k], last[k]}); // @viz spans
        std::sort(spans.begin(), spans.end()); // at most 26 spans, by start // @viz merge
        std::vector<int> res; // @viz merge
        int a = spans[0].first, b = spans[0].second; // the part being built // @viz merge
        for (size_t i = 1; i < spans.size(); ++i) { // @viz merge
            if (spans[i].first <= b) b = std::max(b, spans[i].second); // overlaps: the letters must stay together // @viz merge
            else { // @viz cut
                res.push_back(b - a + 1); // @viz cut
                a = spans[i].first; // @viz cut
                b = spans[i].second; // @viz cut
            }
        }
        res.push_back(b - a + 1); // @viz return
        return res; // @viz return
    }
};
