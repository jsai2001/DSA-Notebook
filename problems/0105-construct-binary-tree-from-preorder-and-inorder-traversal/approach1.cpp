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
#include <vector>
class Solution {
public:
    TreeNode* buildTree(std::vector<int>& preorder, std::vector<int>& inorder) {
        if (preorder.empty()) return nullptr; // no values: no tree // @viz empty
        TreeNode* root = new TreeNode(preorder[0]); // preorder starts with the root // @viz root
        // in inorder, everything before the root is its left subtree
        int k = int(std::find(inorder.begin(), inorder.end(), root->val) - inorder.begin()); // @viz find
        // The left subtree has k values: the next k of preorder, and the first k of inorder.
        std::vector<int> preL(preorder.begin() + 1, preorder.begin() + 1 + k), inL(inorder.begin(), inorder.begin() + k); // @viz left
        root->left = buildTree(preL, inL); // @viz left
        std::vector<int> preR(preorder.begin() + 1 + k, preorder.end()), inR(inorder.begin() + k + 1, inorder.end()); // @viz right
        root->right = buildTree(preR, inR); // @viz right
        return root; // @viz return
    }
};
