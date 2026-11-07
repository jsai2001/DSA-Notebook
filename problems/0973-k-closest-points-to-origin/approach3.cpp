#include <random>
#include <utility>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> kClosest(std::vector<std::vector<int>>& points, int k) {
        int n = points.size(); // @viz init
        std::vector<int> d(n), idx(n); // squared distances, and the order being partitioned // @viz init
        for (int i = 0; i < n; ++i) { d[i] = points[i][0] * points[i][0] + points[i][1] * points[i][1]; idx[i] = i; } // @viz init
        static std::mt19937 rng(973); // @viz init
        int lo = 0, hi = n - 1; // put the k smallest distances in idx[0..k-1], in any order // @viz init
        while (lo < hi) { // @viz part
            std::swap(idx[std::uniform_int_distribution<int>(lo, hi)(rng)], idx[hi]); // random pivot: no bad input can force O(n²) // @viz part
            int pivot = d[idx[hi]], store = lo; // @viz part
            for (int i = lo; i < hi; ++i) // move everything closer than the pivot to the left // @viz part
                if (d[idx[i]] < pivot) std::swap(idx[i], idx[store++]); // @viz part
            std::swap(idx[store], idx[hi]); // the pivot lands at its sorted place // @viz part
            if (store == k - 1) break; // @viz keep
            if (store < k - 1) lo = store + 1; // the k-th closest is to the right // @viz keep
            else hi = store - 1; // it's to the left // @viz keep
        }
        std::vector<std::vector<int>> ans; // @viz return
        for (int i = 0; i < k; ++i) ans.push_back(points[idx[i]]); // @viz return
        return ans; // @viz return
    }
};
