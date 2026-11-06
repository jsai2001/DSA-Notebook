/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node(int _val) : val(_val) {}
};
*/
#include <vector>
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr; // @viz init
        // Pass 1: find every node. Values are unique (1..100), so they can be array indexes.
        std::vector<Node*> old(101, nullptr); // old[v] = the original node with value v // @viz find
        std::vector<Node*> stack{node}; // @viz find
        old[node->val] = node; // @viz find
        while (!stack.empty()) { // @viz find
            Node* cur = stack.back(); // @viz find
            stack.pop_back(); // @viz find
            for (Node* nb : cur->neighbors) { // @viz find
                if (!old[nb->val]) { // @viz find
                    old[nb->val] = nb; // @viz find
                    stack.push_back(nb); // @viz find
                }
            }
        }
        std::vector<Node*> copy(101, nullptr); // @viz make
        for (int v = 1; v <= 100; ++v) { // @viz make
            if (old[v]) copy[v] = new Node(v); // one copy per node // @viz make
        }
        // Pass 2: wire each copy to the copies of its neighbors.
        for (int v = 1; v <= 100; ++v) { // @viz wire
            if (!old[v]) continue; // @viz wire
            for (Node* nb : old[v]->neighbors) { // @viz wire
                copy[v]->neighbors.push_back(copy[nb->val]); // @viz wire
            }
        }
        return copy[node->val]; // @viz return
    }
};
