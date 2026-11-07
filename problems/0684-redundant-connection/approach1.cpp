#include <vector>
class Solution {
public:
    std::vector<int> findRedundantConnection(std::vector<std::vector<int>>& edges) {
        const int n = edges.size(); // n nodes, n edges: one edge too many for a tree // @viz init
        for (int skip = n - 1; skip >= 0; --skip) { // last edge first: the answer is the last one that works // @viz skip
            std::vector<std::vector<int>> adj(n + 1); // @viz build
            for (int k = 0; k < n; ++k) { // the graph without edge `skip` // @viz build
                if (k == skip) continue; // @viz build
                adj[edges[k][0]].push_back(edges[k][1]); // @viz build
                adj[edges[k][1]].push_back(edges[k][0]); // @viz build
            }
            std::vector<char> seen(n + 1, 0); // @viz walk
            std::vector<int> stack{1}; // @viz walk
            seen[1] = 1; // @viz walk
            int count = 1; // @viz walk
            while (!stack.empty()) { // can every node be reached from node 1? // @viz walk
                int u = stack.back(); // @viz walk
                stack.pop_back(); // @viz walk
                for (int v : adj[u]) { // @viz walk
                    if (!seen[v]) { // @viz walk
                        seen[v] = 1; // @viz walk
                        ++count; // @viz walk
                        stack.push_back(v); // @viz walk
                    }
                }
            }
            if (count == n) return edges[skip]; // connected with n - 1 edges: a tree // @viz found
        }
        return {}; // not reached: one edge always works
    }
};
