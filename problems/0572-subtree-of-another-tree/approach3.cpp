/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <algorithm>
#include <array>
#include <map>
#include <vector>
class Solution {
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        ids.clear(); // (val, left id, right id) -> a number; two subtrees get the same number exactly when they're equal // @viz init
        std::vector<int> unused, everywhere; // @viz target
        int target = tag(subRoot, unused); // @viz target
        tag(root, everywhere); // the number of every subtree of root // @viz scan
        return std::find(everywhere.begin(), everywhere.end(), target) != everywhere.end(); // @viz return
    }
private:
    std::map<std::array<int, 3>, int> ids;
    int tag(TreeNode* node, std::vector<int>& out) { // returns node's number, and adds it to out // @viz tag
        if (!node) return 0; // every empty subtree is number 0 // @viz tag
        std::array<int, 3> key = {node->val, tag(node->left, out), tag(node->right, out)}; // children first // @viz key
        auto it = ids.find(key); // @viz key
        if (it == ids.end()) it = ids.emplace(key, (int)ids.size() + 1).first; // a shape not seen before: the next number // @viz key
        out.push_back(it->second); // @viz key
        return it->second; // @viz key
    }
};
