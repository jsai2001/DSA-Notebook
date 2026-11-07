#include <numeric>
#include <vector>
class Solution {
public:
    std::vector<int> findRedundantConnection(std::vector<std::vector<int>>& edges) {
        parent.resize(edges.size() + 1); // @viz init
        std::iota(parent.begin(), parent.end(), 0); // every node starts as its own group // @viz init
        for (auto& e : edges) { // @viz edge
            int ra = find(e[0]), rb = find(e[1]); // @viz edge
            if (ra == rb) return e; // already in one group: this edge closes a cycle // @viz found
            parent[ra] = rb; // join the groups (the roots, not a and b) // @viz union
        }
        return {}; // not reached
    }

private:
    std::vector<int> parent;
    int find(int x) { // the group's representative (root)
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving keeps the trees flat
            x = parent[x];
        }
        return x;
    }
};
