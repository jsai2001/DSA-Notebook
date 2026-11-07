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
#include <vector>
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        std::vector<TreeNode*> a = path(root, p), b = path(root, q); // @viz both
        TreeNode* lca = root; // @viz compare
        for (size_t i = 0; i < a.size() && i < b.size() && a[i] == b[i]; ++i) lca = a[i]; // the deepest node both paths share // @viz compare
        return lca; // @viz return
    }
private:
    std::vector<TreeNode*> path(TreeNode* node, TreeNode* target) { // the BST search path from the root down to target // @viz path
        std::vector<TreeNode*> out; // @viz path
        while (node != target) { // @viz path
            out.push_back(node); // @viz path
            node = target->val < node->val ? node->left : node->right; // smaller: go left; bigger: go right // @viz path
        }
        out.push_back(node); // @viz path
        return out; // @viz path
    }
};
