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
    bool isValidBST(TreeNode* root) {
        return check(root); // @viz return
    }
private:
    void allValues(TreeNode* node, std::vector<int>& out) { // every value in this subtree // @viz collect
        if (!node) return; // @viz collect
        out.push_back(node->val); // @viz collect
        allValues(node->left, out); // @viz collect
        allValues(node->right, out); // @viz collect
    }
    bool check(TreeNode* node) { // @viz call
        if (!node) return true; // @viz call
        // Every value on the left must be smaller, every value on the right bigger.
        std::vector<int> left, right; // @viz left
        allValues(node->left, left); // @viz left
        for (int v : left) if (v >= node->val) return false; // @viz left
        allValues(node->right, right); // @viz right
        for (int v : right) if (v <= node->val) return false; // @viz right
        return check(node->left) && check(node->right); // @viz recurse
    }
};
