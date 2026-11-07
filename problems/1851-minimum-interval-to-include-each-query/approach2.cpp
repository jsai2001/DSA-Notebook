#include <algorithm>
#include <numeric>
#include <vector>
class Solution {
    std::vector<int> nxt; // nxt[i] leads to the first unanswered point at or after i
    int find(int i) { // follow nxt, shortening the path as we go // @viz init
        int root = i; // @viz init
        while (nxt[root] != root) root = nxt[root]; // @viz init
        while (nxt[i] != root) { int up = nxt[i]; nxt[i] = root; i = up; } // @viz init
        return root; // @viz init
    }
public:
    std::vector<int> minInterval(std::vector<std::vector<int>>& intervals, std::vector<int>& queries) {
        std::vector<int> qs(queries); // the different query points, in order // @viz init
        std::sort(qs.begin(), qs.end()); // @viz init
        qs.erase(std::unique(qs.begin(), qs.end()), qs.end()); // @viz init
        int m = qs.size(); // @viz init
        std::vector<int> size(m, -1); // answer for each point // @viz init
        nxt.assign(m + 1, 0); // @viz init
        std::iota(nxt.begin(), nxt.end(), 0); // @viz init
        auto iv = intervals; // @viz interval
        std::sort(iv.begin(), iv.end(), [](const auto& x, const auto& y) { return x[1] - x[0] < y[1] - y[0]; }); // smallest interval first // @viz interval
        for (auto& v : iv) { // @viz interval
            int i = find(std::lower_bound(qs.begin(), qs.end(), v[0]) - qs.begin()); // first unanswered point inside // @viz interval
            while (i < m && qs[i] <= v[1]) { // every unanswered point it covers: this is their smallest // @viz fill
                size[i] = v[1] - v[0] + 1; // @viz fill
                nxt[i] = i + 1; // answered: skip it from now on // @viz fill
                i = find(i + 1); // @viz fill
            }
        }
        std::vector<int> ans; // @viz return
        for (int q : queries) ans.push_back(size[std::lower_bound(qs.begin(), qs.end(), q) - qs.begin()]); // @viz return
        return ans; // @viz return
    }
};
